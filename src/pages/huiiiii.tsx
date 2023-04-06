import styles from "./huiiiii.module.css";

const Huiiiii = () => {
  return (
    <div
      className={`w-screen h-screen flex justify-center items-center ${
        styles.body ?? ""
      }`}
    >
      <div
        className="animate-[spin_2s_ease-in-out_infinite]"
        style={{
          color: "red",
          fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
          fontSize: "4rem",
          textAlign: "center",
          rotate: "45deg",
        }}
      >
        Graphic Design is my Passion
      </div>
    </div>
  );
};

export default Huiiiii;
