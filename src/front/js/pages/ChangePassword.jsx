import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ChangePassword = () => {
    const { store, actions } = useContext(Context);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    function handleSubmit() {
        actions.changePassword(currentPassword,	newPassword, confirmPassword);
      }

    return (
        <div className="container mt-5">
        <h2 className="mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
    </div>
    );
};

