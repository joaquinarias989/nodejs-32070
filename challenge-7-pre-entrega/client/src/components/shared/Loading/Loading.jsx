import "./Loading.css";

const Loading = ({ box = true }) => {
  return box ? (
    <div className="center-50">
      <div className="spinner"></div>
    </div>
  ) : (
    <div className="spinner"></div>
  );
};

export default Loading;
