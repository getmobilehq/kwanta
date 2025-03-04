export default function TreeView({ files, onSelect }) {
  return (
    <div>
      <h2>File Explorer</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => onSelect(file)}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}