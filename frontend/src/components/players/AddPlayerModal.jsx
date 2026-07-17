import Modal from "../common/Modal";
import PlayerForm from "./PlayerForm";

export default function AddPlayerModal({
    open,
    loading,
    onClose,
    onSubmit,
}) {
    return (
        <Modal
            open={open}
            title="Add Player"
            onClose={onClose}
        >
            <PlayerForm
                submitLabel="Add Player"
                loading={loading}
                onSubmit={onSubmit}
            />
        </Modal>
    );
}