import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";
import logo from "../public/level1-logo.svg";
import gotyLogo from "../public/goty-logo.svg";
import { NextSeo } from "next-seo";
import arvutiTarkLogo from "../public/arvutitark-logo.svg";
import psLogo from "../public/playstation-logo.svg";

const FORMSPARK_FORM_ID = "K8SA04vLp";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("Hääletus on lõppenud.");
  const [formIsVisible, setFormIsVisible] = useState(false);

  const watchGotyList = watch("goty", false); // you can supply default value as second argument

  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const onSubmit = async (data) => {
    // e.preventDefault();
    // console.log(data);
    await submit(data)
      .then(() => {
        setFormIsVisible(false);
        setMessage("Hääletatud!");
      })
      .catch(() => {
        setFormIsVisible(false);
        setMessage(
          "Oih, midagi juhtus. Proovi uuesti või saada kiri info@level1.ee."
        );
      });
  };

  return (
    <div className="max-w-3xl mx-auto pt-9 px-8">
      <NextSeo
        title="2023 aasta mängu valimine - Level1.ee"
        description="Aastal 2023 ilmus meeletus koguses väga häid videomänge. Ent milline neist oli kõige parem? Jaga meiega oma tänavust lemmikmängu ning osale suures auhinnaloosis."
        canonical="https://goty.level1.ee/"
        openGraph={{
          images: [
            {
              url: "https://goty.level1.ee/og.png?v=20231218",
              width: 1200,
              height: 630,
              alt: "Level1.ee - 2023 aasta mängu valimine",
              type: "image/png",
            },
          ],
        }}
      />
      {formIsVisible ? (
        <div className="flex gap-9 flex-col-reverse md:flex-row">
          <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              <div className="">
                <label className="form-label" htmlFor="nimi">
                  Nimi
                </label>
                <input
                  className="form-item"
                  id="nimi"
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Manny Cavalera"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <span className=" mt-2 block text-sm text-red-400">
                    See väli on kohustuslik
                  </span>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="epost">
                  E-posti aadress
                </label>

                <input
                  className="form-item"
                  id="epost"
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="eesnimi@email.ee"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <span className=" mt-2 block text-sm text-red-400">
                    See väli on kohustuslik
                  </span>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="aasta-mang">
                  Sinu aasta mäng
                </label>
                <select
                  className="form-item"
                  id="aasta-mang"
                  {...register("goty", { required: true })}
                  aria-invalid={errors.goty ? "true" : "false"}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Vali...
                  </option>
                  {[
                    "Final Fantasy 16",
                    "Marvel's Spider-Man 2",
                    "Baldur's Gate 3",
                    "Resident Evil 4",
                    "Alan Wake II",
                    "Diablo IV",
                    "The Legend of Zelda: Tears of the Kingdom",
                    "Hogwarts Legacy",
                    "Starfield",
                    "Super Mario Bros. Wonder",
                  ].map((game) => (
                    <option key={game} value={game}>
                      {game}
                    </option>
                  ))}
                  <option value="other">Muu (soovita oma valikut)</option>
                </select>
                {errors.goty && (
                  <span className=" mt-2 block text-sm text-red-400">
                    See väli on kohustuslik
                  </span>
                )}
              </div>

              {watchGotyList === "other" && (
                <div>
                  <label className="form-label" htmlFor="soovita">
                    Soovita mängu
                  </label>
                  <input
                    className="form-item"
                    id="soovita"
                    type="text"
                    {...register("other", { required: true })}
                    aria-invalid={errors.other ? "true" : "false"}
                  />
                  {errors.other && (
                    <span className=" mt-2 block text-sm text-red-400">
                      See väli on kohustuslik
                    </span>
                  )}
                </div>
              )}
              <div>
                <label className="form-label" htmlFor="miks">
                  Miks just see mäng?
                </label>

                <textarea
                  className="form-item"
                  id="miks"
                  {...register("why")}
                  cols="30"
                  rows="2"
                />
              </div>
              <input
                {...register("_gotcha")}
                type="checkbox"
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>
            <div className="glowing relative mt-9">
              <input
                disabled={submitting}
                className="cursor-pointer block w-full text-md mix-blend-darken font-bold uppercase py-3 text-white bg-black tracking-widest rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50;"
                type="submit"
                value={"Hääleta"}
              />
            </div>
          </form>
          <div className="flex-1">
            <Image
              className="mb-9"
              src={gotyLogo}
              alt="2023 aasta mängu valimine"
              priority
            />
            <p className="text-green-100 leading-7">
              Aastal 2023 ilmus meeletus koguses väga häid videomänge. Ent
              milline neist oli kõige parem? Jaga meiega oma tänavust
              lemmikmängu ning osale suures auhinnaloosis, mille raames jagame
              ära sellised auhinnad:{" "}
              <strong className="font-bold">
                Logitech PRO X 2 juhtmevaba mänguri peakomplekt, Razer Cobra Pro
                mänguri hiir, SteelSeries Arena 3 kõlarid, Horizon Forbidden
                West Collector's Edition, God of War Ragnarök Collector's
                Edition.
              </strong>
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl font-bold p-6 text-green-200">
          {message}
        </div>
      )}
      <div className="flex items-center justify-center gap-12 border-t border-t-gray-700 mt-8 pt-6 pb-8">
        <a
          href="https://www.facebook.com/SonyPlayStationEesti/"
          target="_blank"
        >
          <Image className="max-w-[40px]" src={psLogo} alt="PlayStation" />
        </a>
        <a href="https://arvutitark.ee/" target="_blank">
          <Image
            className="max-w-[120px]"
            src={arvutiTarkLogo}
            alt="Arvutitark"
          />
        </a>
      </div>
    </div>
  );
}
