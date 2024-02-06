const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			userName: null,
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

			]
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
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
						return alert('Wrong user or password');
					}

					getActions().tokenLogin(json.access_token);
					setStore({ token: json.access_token});

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
						return alert('User name or email already registered, please go back and try again');
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
				setStore({ token: null, userName: null});
			},
			taskAsDone: (id) => {
					const store = getStore()
					const storedTasks = store.tasks
					const correctTask = storedTasks.findIndex(task => task.idTask === id)
					storedTasks[correctTask].complete == false ? storedTasks[correctTask].complete = true : storedTasks[correctTask].complete = false
					setStore({tasks: storedTasks})
					

			}
		}
	};
};

export default getState;
