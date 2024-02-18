import Swal from 'sweetalert2'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userInfo: "",
			loggedIn: false,
			token: null,
			activity: [],
			tasks: [],
			notes: [],
			clients: [],
			invoices: [],
			payments: [],
		},
		actions: {
			postLogin: async (user, password) => {
				let data = {
					user_name: user,
					password: password
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					});
					const json = await response.json();

					if (!response.ok) {
						console.log(response.statusText);
						return Swal.fire({
							icon: "error",
							title: "Error",
							text: "Wrong user or password",
						});
					}

					const expirationTime = new Date().getTime() + 30 * 60 * 1000;
					getActions().tokenLogin(json.access_token, expirationTime);
					setStore({ token: json.access_token });

				} catch (error) {
					console.log('Error login in', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to log in. Please try again later."
					});
				}
			},
			postSignUp: async (user, email, password) => {
				let newUser = {
					email: email,
					user_name: user,
					password: password
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/signup', {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(newUser)
					});
					const json = await response.json();

					if (!response.ok) {
						console.log(response.statusText);
						return Swal.fire({
							icon: "error",
							title: "Error",
							text: "User name or email already registered, please try again",
						});
					}

					Swal.fire({
						icon: "success",
						title: "Success",
						text: "User created, please log in",
					});

				} catch (error) {
					console.log('Error creating user:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to create user. Please try again later."
					});
				}
			},
			tokenLogin: (token, expirationTime) => {
				setStore({ loggedIn: true });
				localStorage.setItem("token", token);
				localStorage.setItem("expirationTime", expirationTime);
			},
			tokenLogout: () => {
				setStore({ loggedIn: false });
				localStorage.removeItem("token");
				localStorage.removeItem("expirationTime");
				setStore({ token: null });
			},
			isLogged: () => {
				const token = localStorage.getItem("token");
				const expirationTime = localStorage.getItem("expirationTime");
			
				if (token && expirationTime) {

					if (new Date().getTime() < parseInt(expirationTime)) {
						setStore({ loggedIn: true });
					} else {
						localStorage.removeItem("token");
						localStorage.removeItem("expirationTime");
						setStore({ loggedIn: false });
					}
				} else {
					setStore({ loggedIn: false });
				}
			},
			getInfo: async () => {
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");

					if (!token) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Session expired, please log in again",
							didClose: () => {
								window.location.href = "/";
							}
						});
						throw new Error("Token is missing");
					}

					const response = await fetch(process.env.BACKEND_URL + '/api/protected', {
						headers: {
							"Authorization": "Bearer " + token
						}
					});

					if (!response.ok) {
						throw new Error("Failed to fetch user info");
					}

					const json = await response.json();
					setStore({ userInfo: json });

				} catch (error) {
					console.log('Error getting user information:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to obtain user information. Please try again later."
					});
				}
			},
			changePassword: async (currentPassword, newPassword, confirmPassword) => {
				let passwordInfo = {
					current_password: currentPassword,
					new_password: newPassword,
					confirm_password: confirmPassword
				};
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");

					if (!token) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Session expired, please log in again",
							didClose: () => {
								window.location.href = "/";
							}
						});
						throw new Error("Token is missing");
					}
					const response = await fetch(process.env.BACKEND_URL + '/api/change_password', {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify(passwordInfo)
					});
					const data = await response.json();

					if (!response.ok) {
						if (response.status === 401) {
							throw new Error("Incorrect current password");
						} else if (response.status === 400) {
							throw new Error("New password and confirm password do not match");
						} else {
							throw new Error("Failed to change password. Please try again later.");
						}
					}

					Swal.fire({
						icon: "success",
						title: "Success",
						text: "Password changed, please log in again",
					});

				} catch (error) {
					console.log("Error changing password:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: (error.message + ", please log in and try again"),
					});
				}
			},
			taskAsDone: async (id, status) => {
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");

					if (!token) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Session expired, please log in again",
							didClose: () => {
								window.location.href = "/";
							}
						});
						throw new Error("Token is missing");
					}

					const response = await fetch(process.env.BACKEND_URL + `/api/task_status/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify({ status: status })
					});
					const data = await response.json();

					if (!response.ok) {
						throw new Error('Failed to edit status');
					}

					setStore(prevStore => ({
						...prevStore,
						tasks: prevStore.tasks.map(task => task.id === id ? data : task)
					}));
					getActions().getTasks()
					
				} catch (error) {
					console.error('Error editing task:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to edit task. Please try again later."
					});
				}

			},
			addClient: async (fullName, email, phone, address, company) => {
				const newClient = {
					full_name: fullName,
					email: email,
					phone: phone,
					address: address,
					company: company
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/add_client', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(newClient)
					});
					const json = await response.json();

					if (!response.ok) {
						throw new Error('Failed to add client');
					}

					getActions().getClients();

				} catch (error) {
					console.error('Error adding client:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to add client. Please try again later."
					});
				}
			},
			editClient: async (clientId, fullName, email, phone, address, company) => {
				const updatedClient = {
					id: clientId,
					full_name: fullName,
					email: email,
					phone: phone,
					address: address,
					company: company
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/edit_client/${clientId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(updatedClient)
					});
					const data = await response.json();

					if (!response.ok) {
						throw new Error('Failed to edit client');
					}

					setStore(prevStore => ({
						...prevStore,
						clients: prevStore.clients.map(client => client.id === clientId ? data : client)
					}));
					getActions().getClients();

				} catch (error) {
					console.error('Error editing client:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to edit client. Please try again later."
					});
				}
			},
			getClients: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/clients');
					const data = await response.json();
					setStore({ clients: data })

				} catch (error) {
					console.error('Error fetching clients:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to get clients. Please try again later."
					});
				}
			},
			addNote: async (noteContent, clientId) => {
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");

					if (!token) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Session expired, please log in again",
							didClose: () => {
								window.location.href = "/";
							}
						});
						throw new Error("Token is missing");
					}

					const response = await fetch(process.env.BACKEND_URL + '/api/add_note', {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify({ note_content: noteContent, client_id: clientId })
					});

					const data = await response.json();

					if (!response.ok) {
						throw new Error('Failed to add note');
					}

					setStore(prevStore => ({
						...prevStore,
						notes: [...prevStore.notes, data]
					}));
					getActions().getNotes();

				} catch (error) {
					console.error("Error creating note:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to create note. Please try again later."
					});
				}
			},
			getNotes: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/notes');
					const data = await response.json();

					setStore({ notes: data })

				} catch (error) {
					console.error('Error fetching notes:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to get notes. Please try again later."
					});
				}
			},
			editNote: async (noteId, newContent) => {
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");

					if (!token) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Session expired, please log in again",
							didClose: () => {
								window.location.href = "/";
							}
						});
						throw new Error("Token is missing");
					}

					const response = await fetch(process.env.BACKEND_URL + `/api/edit_note/${noteId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify({ note_content: newContent })
					});

					const data = await response.json();

					if (!response.ok) {
						throw new Error('Failed to edit note');
					}

					setStore(prevStore => ({
						...prevStore,
						notes: prevStore.notes.map(note => note.id === noteId ? data : note)
					}));
					getActions().getNotes();

				} catch (error) {
					console.error("Error editing note:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to edit note. Please try again later."
					});
				}
			},
			deleteNote: async (noteId) => {
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");

					if (!token) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Session expired, please log in again",
							didClose: () => {
								window.location.href = "/";
							}
						});
						throw new Error("Token is missing");
					}

					const response = await fetch(process.env.BACKEND_URL + `/api/delete_note/${noteId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						}
					});

					const data = await response.json();

					if (!response.ok) {
						throw new Error("Failed to delete note");
					}

					setStore(prevStore => ({
						...prevStore,
						notes: prevStore.notes.filter(note => note.id !== noteId)
					}));
					getActions().getNotes();

				} catch (error) {
					console.error("Error deleting note:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to delete note. Please try again later."
					});
				}
			},
			addInvoice: async (amount, detail, clientId) => {
				const newInvoice = {
					amount: amount,
					detail: detail,
					client_id: clientId
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/add_invoice', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(newInvoice)
					});
					const data = await response.json();

					if (!response.ok) {
						throw new Error('Failed to add invoice');
					}

					setStore(prevStore => ({
						...prevStore,
						invoices: [...prevStore.invoices, data]
					}));
					getActions().getInvoices();

				} catch (error) {
					console.error('Error adding invoice:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to create invoice. Please try again later."
					});
				}
			},
			getInvoices: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/invoices');
					const data = await response.json();

					setStore({ invoices: data })

				} catch (error) {
					console.error('Error fetching invoices:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to get invoices. Please try again later."
					});
				}
			},
			editInvoice: async (invoiceId, amount, detail) => {
				const updatedInvoice = {
					amount: amount,
					detail: detail
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/edit_invoice/${invoiceId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(updatedInvoice)
					});
					const data = await response.json();

					if (!response.ok) {
						throw new Error('Failed to edit invoice');
					}

					setStore(prevStore => ({
						...prevStore,
						invoices: prevStore.invoices.map(invoice => invoice.id === invoiceId ? data : invoice)
					}));
					getActions().getInvoices();

				} catch (error) {
					console.error('Error editing invoice:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to edit invoice. Please try again later."
					});
				}
			},
			addPayment: async (amount, paymentDate, detail, clientId) => {
				const newPayment = {
					amount: amount,
					payment_date: paymentDate,
					detail: detail,
					client_id: clientId
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/add_payment', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(newPayment)
					});
					const data = await response.json();

					if (!response.ok) {
						throw new Error('Failed to add payment');
					}

					setStore(prevStore => ({
						...prevStore,
						payments: [...prevStore.payments, data]
					}));
					getActions().getPayments();

				} catch (error) {
					console.error('Error adding payment:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to create payment. Please try again later."
					});
				}
			},
			getPayments: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/payments');
					const data = await response.json();

					setStore({ payments: data })
					

				} catch (error) {
					console.error('Error fetching payments:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to get payments. Please try again later."
					});
				}
			},
			editPayment: async (paymentId, amount, detail, paymentDate) => {
				const updatedPayment = {
					amount: amount,
					payment_date: paymentDate,
					detail: detail
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/edit_payment/${paymentId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(updatedPayment)
					});
					const data = await response.json();

					if (!response.ok) {
						throw new Error('Failed to edit payment');
					}

					setStore(prevStore => ({
						...prevStore,
						payments: prevStore.payments.map(payment => payment.id === paymentId ? data : payment)
					}));
					getActions().getPayments();

				} catch (error) {
					console.error('Error editing payment:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to edit payment. Please try again later."
					});
				}
			},
			getTasks: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/tasks');
					const data = await response.json();

					setStore({ tasks: data })

				} catch (error) {
					console.error('Error fetching tasks:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to get tasks. Please try again later."
					});
				}
			},
			editTask: async (taskId, title, due_date, status, priority, user_name,) => {
				const editedTask = {
					due_date: due_date,
					task_title: title,
					status: status,
					priority: priority,
					user_name: user_name,
				}
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");

					if (!token) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Session expired, please log in again",
							didClose: () => {
								window.location.href = "/";
							}
						});
						throw new Error("Token is missing");
					}

					const response = await fetch(process.env.BACKEND_URL + `/api/edit_task/${taskId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify(editedTask)
					});

					const data = await response.json();

					if (!response.ok) {
						throw new Error('Failed to edit task');
					}

					setStore(prevStore => ({
						...prevStore,
						tasks: prevStore.tasks.map(task => task.id === taskId ? data : task)
					}));
					getActions().getTasks();

				} catch (error) {
					console.error("Error editing task:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to edit task. Please try again later."
					});
				}
			},
			deleteTask: async (taskId) => {
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");

					if (!token) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Session expired, please log in again",
							didClose: () => {
								window.location.href = "/";
							}
						});
						throw new Error("Token is missing");
					}

					const response = await fetch(process.env.BACKEND_URL + `/api/delete_task/${taskId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						}
					});

					const data = await response.json();

					if (!response.ok) {
						throw new Error("Failed to delete task");
					}

					setStore(prevStore => ({
						...prevStore,
						tasks: prevStore.tasks.filter(task => task.id !== taskId)
					}));
					getActions().getTasks();

				} catch (error) {
					console.error("Error deleting task:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to delete task. Please try again later."
					});
				}
			},
			addTask: async (title, due_date, status, priority, user_name, client_id) => {
				const task = {
					task_title: title,
					due_date: due_date,
					status: status,
					priority: priority,
					user_name: user_name,
					client_id: client_id
				}
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");

					if (!token) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Session expired, please log in again",
							didClose: () => {
								window.location.href = "/";
							}
						});
						throw new Error("Token is missing");
					}

					const response = await fetch(process.env.BACKEND_URL + '/api/add_task', {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify(task)
					});

					const data = await response.json();

					setStore(prevStore => ({
						...prevStore,
						tasks: [...prevStore.tasks, data]
					}));
					getActions().getTasks();

				} catch (error) {
					console.error("Error creating task:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to create task. Please try again later."
					});
				}
			},
			getUser: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/user');
					const data = await response.json();

					setStore({ userNames: data })

				} catch (error) {
					console.error('Error fetching user:', error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Failed to get Users. Please try again later."
					});
				}
			},
		}
	};
};
export default getState;
