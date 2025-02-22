import PropTypes from "prop-types";
const EditModal = ({
  editTask,
  setEditTask,
  closeEditModal,
  handleUpdateTask,
}) => (
  <div className="fixed inset-0 flex items-center justify-center modal-overlay p-4">
    <div className="modal-container p-6 md:p-8 w-full max-w-md md:max-w-lg">
      <h2 className="modal-header mb-5">Edit Task</h2>

      {/* Task Name Input */}
      <input
        type="text"
        value={editTask.title}
        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
        placeholder="Task Name"
        className="modal-input mb-4"
      />

      {/* Task Description Textarea */}
      <textarea
        value={editTask.description}
        onChange={(e) =>
          setEditTask({ ...editTask, description: e.target.value })
        }
        placeholder="Short Description"
        className="modal-textarea mb-4"
      />
      <select
        name="category"
        value={editTask.category}
        onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
        className="modal-select mb-6"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {/* Modal Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={closeEditModal}
          className="modal-button-cancel px-5 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateTask}
          className="modal-button-primary px-5 py-2 rounded-lg"
        >
          Update
        </button>
      </div>
    </div>
  </div>
);
export default EditModal;
EditModal.propTypes = {
  editTask: PropTypes.object.isRequired,
  setEditTask: PropTypes.func.isRequired,
  closeEditModal: PropTypes.func.isRequired,
  handleUpdateTask: PropTypes.func.isRequired,
};
