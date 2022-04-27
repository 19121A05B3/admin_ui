import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
interface liverates {
  change: number;
  rate: number;
}
export default function LiveRates(liverates: liverates) {
  let abschange = Math.abs(liverates.change);

  return (
    <div className="liveRates">
      <div className="live-rates">
        {liverates.change > 0 && (
          <div>
            {liverates.rate} <br />
            <span className="increase">
              <CaretUpOutlined /> {abschange}
            </span>
          </div>
        )}

        {liverates.change < 0 && (
          <div>
            {liverates.rate} <br />
            <span className="decrease">
              <CaretDownOutlined /> {abschange}
            </span>
          </div>
        )}
        {!liverates.change && (
          <div>
            {liverates.rate} <br />
            <span>----</span>
          </div>
        )}
      </div>
    </div>
  );
}
