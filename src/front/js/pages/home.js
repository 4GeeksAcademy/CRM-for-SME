import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";
import { ModalAddTask } from "../component/ModalAddTask.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState(false);

	return (
		<div className="text-center mt-5">
			<button className="btn btn-secondary" onClick={() => setState(true)}>
				test
			</button>
			<ModalAddTask show={state} onClose={() => setState(false)}   />
		</div>
	);
};
