import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";
import logo from "../public/level1-logo.svg";
import gotyLogo from "../public/goty-logo.svg";

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
      <Head>
        <title>Level1.ee aasta mängu 2022 valimine</title>
      </Head>

      {formIsVisible ? (
        <div className="">
          <div className="">
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
          </div>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      ) : (
        <div className="text-center text-2xl font-bold p-6 text-green-200">
          {message}
        </div>
      )}
    </div>
  );
}
