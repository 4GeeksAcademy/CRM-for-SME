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
		}
	};
};

export default getState;
