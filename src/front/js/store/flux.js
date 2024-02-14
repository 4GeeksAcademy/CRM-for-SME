import Swal from 'sweetalert2'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userInfo: "",
			loggedIn: false,
			token: null,
			activity : [
				{activity: 'created task',
				date: '1/1/24'
			},
				{activity: 'created note',
				date: '1/10/24'
			},
				{activity: 'created pago',
				date: '1/12/24'
			},
			],
			tasks: [
			{
				client: 'Daniel test',
				idTask: 1234567,
				title:'Test task 1',
				description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste nihil tenetur suscipit expedita voluptatibus impedit!',
				dueDate: "2/10/2024",
				priority:'Medium',
				userAsing:'Daniel User',
				complete: false

			},
			{
				client: 'Daniel test',
				idTask: 1234578,
				title:'Test task 2',
				description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste nihil tenetur suscipit expedita voluptatibus impedit!',
				dueDate: "2/10/2024",
				priority:'Low',
				userAsing:'Fabian User',
				complete: false

			},
			{
				client: 'Daniel test',
				idTask: 1234590,
				title:'Test task 3',
				description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste nihil tenetur suscipit expedita voluptatibus impedit!',
				dueDate: "2/10/2024",
				priority:'High',
				userAsing:'Ricardo User',
				complete: false

			},
			{
				client: 'Daniel test',
				idTask: 1234521,
				title:'Test task 4',
				description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste nihil tenetur suscipit expedita voluptatibus impedit!',
				dueDate: "2/10/2024",
				priority:'Medium',
				userAsing:'Daniel Abarca User',
				complete: false

			},

			],
			notes: [
			{
				client: 'Daniel test',
				addedByUser: 'Daniel User',
				dateCreated: '5/2/2024',
				text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quam libero, in, deserunt sed quasi autem, repellat placeat impedit nemo aperiam est quidem. Sint, sed?',
				idNote:'12345635'
			},
			{
				client: 'Daniel test',
				addedByUser: 'Ricardo User',
				dateCreated: '1/2/2024',
				text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quam libero, in, deserunt sed quasi autem, repellat placeat impedit nemo aperiam est quidem. Sint, sed? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, tenetur vitae modi accusantium autem, minus nesciunt numquam voluptatibus quaerat labore error qui ratione mollitia quibusdam.',
				idNote:'12345689'
			},
			{
				client: 'Daniel test',
				addedByUser: 'Fabian User',
				dateCreated: '7/2/2024',
				text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quam libero, in, deserunt sed quasi autem, repellat placeat impedit nemo aperiam est quidem. Sint, sed?',
				idNote:'12345690'
			},
			{
				client: 'Daniel test',
				addedByUser: 'Daniel User',
				dateCreated: '10/2/2024',
				text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quam libero, in, deserunt sed quasi autem, repellat placeat impedit nemo aperiam est quidem. Sint, sed?',
				idNote:'12345667'
			},
			],
			clients: []
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

					getActions().tokenLogin(json.access_token);
					setStore({ token: json.access_token});
					const store = getStore()
					console.log(store.token);
				} catch (error) {
					console.log(error);
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
							text: "User name or email already registered, please go back and try again",
						  });
					}

					console.log(json);
					
				} catch (error) {
					console.log(error);
				}
			},
			tokenLogin: (token) =>{
				setStore({loggedIn: true});
				localStorage.setItem("token", token);
			},
			tokenLogout: () =>{
				setStore({loggedIn: false});
				localStorage.removeItem("token");
				setStore({token: null});
			},
			isLogged: () => {
				if (localStorage.getItem("token")){
					setStore({loggedIn: true})
				} 
				else {
					setStore({loggedIn: false})
				}
			},
			getInfo: async () => {
				try {
					const store = getStore();
					const token = store.token || localStorage.getItem("token");
			
					if (!token) {
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
					console.error("Error fetching user info:", error.message);
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
			
					console.log(data);
			
					Swal.fire({
						icon: "success",
						title: "Success",
						text: data,
					});
				} catch (error) {
					console.log("Error changing password:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: error,
					});
				}
			},
			taskAsDone: (id) => {
					const store = getStore()
					const storedTasks = store.tasks
					const correctTask = storedTasks.findIndex(task => task.idTask === id)
					storedTasks[correctTask].complete == false ? storedTasks[correctTask].complete = true : storedTasks[correctTask].complete = false
					setStore({tasks: storedTasks})
					

			},
			addClient: async (inputFullName, inputEmail, inputPhone, inputAddress, inputCompany) => {
				const newClient = {
					full_name: inputFullName,
					email: inputEmail,
					phone: inputPhone,
					address: inputAddress,
					company: inputCompany
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
				}
			},
			getClients: async () => {
				try {
			
				  const response = await fetch(process.env.BACKEND_URL + '/api/clients');
				  const data = await response.json();
				  setStore({ clients: data })
				  
				} catch (error) {
				  console.error('Error fetching clients:', error);
				}
			},
		}
	};
};

export default getState;
