import Modal from "../common/Modal";
import Button from "../common/Button";

export default function DeletePlayerModal({
    open,
    player,
    loading,
    onClose,
    onDelete,
}) {
    if (!player) return null;

    return (
        <Modal
            open={open}
            title="Delete Player"
            onClose={onClose}
        >
            <div className="space-y-6">

                <p className="text-slate-300">
                    Are you sure you want to delete
                    <span className="font-semibold text-red-400">
                        {" "}
                        {player.name}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-3">

                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        disabled={loading}
                        onClick={() => onDelete(player)}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>

                </div>

            </div>
        </Modal>
    );
}