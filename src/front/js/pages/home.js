import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";
import { ModalAddChargeInvoice} from "../component/ModalAddChargeInvoice.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState(false);

	return (
		<div className="text-center mt-5">
			<button className="btn btn-secondary" onClick={() => setState(true)}>
				test
			</button>
			<ModalAddChargeInvoice show={state} onClose={() => setState(false)}   />
		</div>
	);
};
