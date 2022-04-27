interface propType {
  data: any;
  colors: Array<any>;
  appliedFilter: String;
}

const DataAboutList = (props: propType) => {
  const { data, appliedFilter } = props;

  function fillLi(legend: String, value: Number, color: any) {
    return (
      <li className="li-element">
        <span
          className="data-dot"
          style={{
            backgroundColor: color,
          }}
        ></span>
        <span
          className={
            appliedFilter === "All" || appliedFilter === legend
              ? "data-legend"
              : "data-legend muted"
          }
        >
          {legend}
        </span>
        <span
          className={
            appliedFilter === "All" || appliedFilter === legend
              ? "data-value"
              : "data-value muted"
          }
        >
          {value === undefined ? "0" : value}
        </span>
      </li>
    );
  }

  return (
    <div className="data-about-list">
      <div className="vl"></div>
      <ul className="ul-element">
        {data &&
          data.map((item: any, index: any) =>
            fillLi(item["legend"], item["value"], props.colors[index])
          )}
      </ul>
    </div>
  );
};

export default DataAboutList;
