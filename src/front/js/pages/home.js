import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";
import { ModalAddNotes } from "../component/ModalAddNotes.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState(false);

	return (
		<div className="text-center mt-5">
			<button className="btn btn-secondary" onClick={() => setState(true)}>
				test
			</button>
			<ModalAddNotes show={state} onClose={() => setState(false)}   />
		</div>
	);
};
