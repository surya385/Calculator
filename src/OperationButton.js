export default function OperationButton({ operation, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ action: "operation", value: operation })}
    >
      {operation}
    </button>
  );
}
