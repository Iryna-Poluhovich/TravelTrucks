import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchCamperById } from "@/lib/api";
import BookingForm from "@/components/BookingForm/BookingForm";
import css from "./CamperPage.module.css";

type Props = { params: { id: string } };

// List of all possible camper feature keys
const featureKeys = [
  "transmission",
  "engine",
  "AC",
  "bathroom",
  "kitchen",
  "TV",
  "radio",
  "refrigerator",
  "microwave",
  "gas",
  "water",
] as const;

type FeatureKey = (typeof featureKeys)[number];

export default async function CamperPage({ params }: Props) {
  const id = params.id;
  const camper = await fetchCamperById(id);
  if (!camper) return notFound();

  const reviews =
    camper.reviews ??
    [{ id: "r1", name: "Anna", rating: 5, text: "Amazing camper!" }];

  return (
    <main className={css.wrapper}>
      {/* HEADER */}
      <section className={css.header}>
        <h1>{camper.name}</h1>
        <div className={css.meta}>
          <span>{camper.location}</span>
          <span>⭐ {camper.rating}</span>
          <span>€{camper.price?.toFixed(2)}</span>
        </div>
      </section>

      {/* GALLERY */}
      <section className={css.gallery}>
        {camper.gallery?.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`${camper.name} image ${i}`}
            width={300}
            height={200}
            className={css.galleryImage}
          />
        ))}
      </section>

      {/* FEATURES + REVIEWS */}
      <section className={css.tabs}>
        <div className={css.features}>
          <h2>Features</h2>
          <ul>
            {featureKeys.map((key: FeatureKey) => {
              const value = camper[key];
              if (value === undefined || value === null) return null;

              return (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={css.reviews}>
          <h2>Reviews</h2>
          {reviews.map((r) => (
            <div key={r.id} className={css.review}>
              <strong>{r.name}</strong>
              <div>⭐ {r.rating}</div>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <aside className={css.booking}>
        <BookingForm
          camperId={camper.id}
          camperName={camper.name}
          price={camper.price}
        />
      </aside>
    </main>
  );
}