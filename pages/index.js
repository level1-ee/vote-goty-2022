import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";
import logo from "../public/level1-logo.svg";
import gotyLogo from "../public/goty-logo.svg";
import { NextSeo } from "next-seo";

const FORMSPARK_FORM_ID = "9kXZImww";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [formIsVisible, setFormIsVisible] = useState(true);

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
        title="2022 aasta mängu valimine - Level1.ee"
        description="Milline oli sinu arvates 2022. aasta parim videomäng? Ära hoia seda enda teada, vaid jaga oma arvamust ka meiega ning võid võita ägedaid auhindu."
        canonical="https://goty.level1.ee/"
        openGraph={{
          images: [
            {
              url: "https://goty.level1.ee/og.png",
              width: 1200,
              height: 630,
              alt: "Level1.ee - 2022 aasta mängu valimine",
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
                  <option value="Horizon Forbidden West">
                    Horizon Forbidden West
                  </option>
                  <option value="Elden Ring">Elden Ring</option>
                  <option value="Gran Turismo 7">Gran Turismo 7</option>
                  <option value="Kirby and the Forgotten Land">
                    Kirby and the Forgotten Land
                  </option>
                  <option value="Tiny Tina's Wonderlands">
                    Tiny Tina's Wonderlands
                  </option>
                  <option value="Teenage Mutant Ninja Turtles: Shredder's Revenge">
                    Teenage Mutant Ninja Turtles: Shredder's Revenge
                  </option>
                  <option value="Stray">Stray</option>
                  <option value="The Last of Us Part I">
                    The Last of Us Part I
                  </option>
                  <option value="God of War Ragnarök">
                    God of War Ragnarök
                  </option>
                  <option value="Call of Duty Warzone 2.0">
                    Call of Duty Warzone 2.0
                  </option>
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
            <a
              href="https://level1.ee"
              title="Mine Level1.ee"
              target={"_blank"}
              className=""
            >
              <Image
                className=" max-w-[100px]"
                src={logo}
                alt="Level1.ee"
                priority
              />
            </a>
            <Image
              className="mb-9"
              src={gotyLogo}
              alt="2022 aasta mängu valimine"
              priority
            />
            <p className="text-green-200  leading-7 pl-[32px]">
              Milline oli sinu arvates 2022. aasta parim videomäng? Ära hoia
              seda enda teada, vaid jaga oma arvamust ka meiega ning võid võita
              ägedaid auhindu:{" "}
              <strong className="font-bold">
                God of War Ragnarök Collector's Edition, Steelseries Arctics
                Nova 1 kõrvaklapid ja Steelseries Apex 9 Mini klaviatuur.
              </strong>
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl font-bold p-6 text-green-200">
          {message}
        </div>
      )}
    </div>
  );
}
