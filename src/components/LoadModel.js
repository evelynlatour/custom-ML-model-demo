import React from "react";

const LoadModel = ({
  isModelLoaded,
  loadedModelName,
  localModels,
  listLocalModels,
  loadLocalModel,
}) => (
  <>
    {isModelLoaded && <h2>{`loaded: "${loadedModelName}"`}</h2>}
    <button onClick={listLocalModels}>List Local Models</button>
    {localModels.map((model, idx) => (
      <div key={idx}>
        <p>{model}</p>
        <button onClick={() => loadLocalModel(model)}>Load Model</button>
      </div>
    ))}
  </>
);

export default LoadModel;
