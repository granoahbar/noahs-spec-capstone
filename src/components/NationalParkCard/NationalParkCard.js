import styles from "./NationalParkCard.module.css";

export default function NpCard(props) {
  const { parks, park } = props;

  return parks.map((park, index) => {
    return (
      <div className={styles.national_park_card} key={park.id}>
        <img src={park.images[0].url} alt="" />
        <p className={styles.park_name}>{park.fullName}</p>
      </div>
    );
  });
}
