import React from "react";
import "./App.css";

interface IFlower {
  name: string;
  img: string;
  description: string;
}

const App: React.FC = (): JSX.Element => {
  const [flowers, setFlowers] = React.useState<IFlower[]>([]);
  const [flower, setFlower] = React.useState<any>("");

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/flowers");
        const data: IFlower[] = await res.json();
        setFlowers(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <h1 style={{ textTransform: "capitalize", textAlign: "center" }}>
        flowers
      </h1>
      <div className="flowers">
        {flowers.length > 0 &&
          flowers.map((flower, idx) => (
            <div key={idx} className="flower">
              <h1>{flower.name}</h1>
              <img src={flower.img} alt={flower.name} />
              <p>{flower.description}</p>
            </div>
          ))}
      </div>
      <select
        name="smoething"
        value="select flower"
        onChange={(e) => {
          (async () => {
            try {
              const res = await fetch(`/api/flower/${e.target.value}`);
              const data: IFlower = await res.json();
              setFlower(data);
            } catch (err) {
              console.log(err);
            }
          })();
        }}
      >
        <option value="select flower" disabled>
          select flower
        </option>

        {flowers.length > 0 &&
          flowers.map((flower, idx) => (
            <option key={idx} value={flower.name}>
              {flower.name}
            </option>
          ))}
      </select>
      {flower !== "" && (
        <div className="flower">
          <h1>{flower.name}</h1>
          <img src={flower.img} alt={flower.name} />
          <p>{flower.description}</p>
        </div>
      )}
    </>
  );
};

export default App;
