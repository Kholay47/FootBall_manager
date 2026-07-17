import Modal from "../common/Modal";
import PlayerForm from "./PlayerForm";

export default function EditPlayerModal({
    open,
    player,
    loading,
    onClose,
    onSubmit,
}) {
    if (!player) return null;

    return (
        <Modal
            open={open}
            title="Edit Player"
            onClose={onClose}
        >
            <PlayerForm
                initialValues={player}
                loading={loading}
                submitLabel="Update Player"
                onSubmit={onSubmit}
            />
        </Modal>
    );
}