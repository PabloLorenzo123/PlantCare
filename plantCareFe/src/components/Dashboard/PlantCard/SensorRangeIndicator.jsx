const SensorRangeIndicator = ({ value, min, max, lowThreshold, highThreshold }) => {
    const percentage = ((value - min) / (max - min)) * 100
  
    return (
      <div className="sensor-range-container my-2">
        <div className="sensor-range">
          <div className="range-area low" style={{ width: `${((lowThreshold - min) / (max - min)) * 100}%` }}></div>
          <div
            className="range-area safe"
            style={{ width: `${((highThreshold - lowThreshold) / (max - min)) * 100}%` }}
          ></div>
          <div className="range-area extreme" style={{ width: `${((max - highThreshold) / (max - min)) * 100}%` }}></div>
          <div className="value-pin" style={{ left: `${percentage}%` }}></div>
        </div>
        <div className="range-labels d-flex justify-content-between mt-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
        <style jsx>{`
          .sensor-range-container {
            width: 100%;
          }
          .sensor-range {
            height: 15px;
            background-color: #e9ecef;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
          }
          .range-area {
            height: 100%;
            display: inline-block;
          }
          .low { background-color: #dc3545; }
          .safe { background-color: #28a745; }
          .extreme { background-color: #ffc107; }
          .value-pin {
            width: 4px;
            height: 30px;
            background-color: #007bff;
            position: absolute;
            top: -5px;
            transform: translateX(-50%);
          }
          .range-labels {
            font-size: 0.8rem;
            color: #6c757d;
          }
        `}</style>
      </div>
    )
  }
  
  export default SensorRangeIndicator
  
  