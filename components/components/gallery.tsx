import { Img } from "../util/img";
import { tinaField } from "tinacms/dist/react";

export const Gallery = ({ gallery, altFallback = "" }) => {
    return (
        <div className="space-y-4 py-16 px-4 lg:px-32 text-center">
            {gallery?.title && (
                <h2
                    className="mt-2 font-title text-3xl font-semibold"
                    data-tina-field={tinaField(gallery, "title")}
                >
                    {gallery.title}
                </h2>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery?.img?.map((img, i) => {
                    const alt = img?.alt || `${altFallback || gallery?.title || "Photo"} – Manon Bertho Studio (${i + 1})`;
                    return (
                        <a
                            className={`${img?.colSpan ?? ""} block`}
                            key={i}
                            href={img?.src}
                            target="_blank"
                            rel="noopener"
                            title="Voir la photo en taille originale"
                        >
                            <Img
                                loading="lazy"
                                className="h-full w-full object-cover"
                                data-tina-field={tinaField(img, "src")}
                                src={img?.src}
                                alt={alt}
                                sizes={img?.colSpan === "col-span-2" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                            />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
