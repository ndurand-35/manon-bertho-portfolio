import { tinaField } from "tinacms/dist/react";

export const Gallery = ({ gallery }) => {
    return (
        <div className="space-y-4 py-16 px-4 lg:px-32 text-center">
            <h1
                className="mt-2 font-title text-3xl font-semibold"
                data-tina-field={tinaField(gallery, "title")}
            >
                {gallery?.title}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery?.img?.map((img, i) => (
                    <div className={img?.colSpan} key={i}>
                        <img
                            className="h-full max-w-full"
                            data-tina-field={tinaField(img, "src")}
                            src={img?.src}
                            alt={img?.alt}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
