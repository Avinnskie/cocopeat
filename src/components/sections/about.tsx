import { Leaf, Droplets, Wind, Shield } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Ramah lingkungan dan berkelanjutan.",
    description:
      "Cocopeat kami adalah produk sampingan yang dapat diperbarui dari industri kelapa, membuatnya menjadi pilihan berkelanjutan untuk peternakan Anda.",
  },
  {
    icon: Droplets,
    title: "Daya serap air yang tinggi.",
    description:
      "Dapat menahan hingga 8 kali beratnya dalam air, mengurangi frekuensi irigasi dan menghemat sumber daya.",
  },
  {
    icon: Wind,
    title: "Sirkulasi udara optimal untuk akar.",
    description:
      "Memberikan porositas yang sangat baik untuk pertumbuhan akar, mencegah kompaksi tanah dan penyakit akar.",
  },
  {
    icon: Shield,
    title: "Media tanam yang lebih sehat.",
    description:
      "Secara alami tahan terhadap pertumbuhan bakteri dan jamur, menjaga tanaman Anda lebih aman dari hama yang berasal dari tanah.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-2 min-h-128.75 px-2">
      <div className="w-full h-full flex flex-col lg:flex-row gap-2">
        <div className="lg:col-span-1 space-y-4 bg-white w-full h-full lg:h-128.75
         flex flex-col justify-center px-5 py-5 md:pl-10 rounded-2xl">
          <p className="text-sm">
            Mari berkontribusi untuk pertanian yang lebih berkelanjutan
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none text-[#46EC13]">
            Solusi Alami
            <br />
            untuk Pertanian
            <br />
            Modern
          </h2>
          <p className="text-sm sm:text-base max-w-md">
            Cocopeat Plus dirancang dari bahan alami sabut kelapa untuk mendukung
            pertumbuhan tanaman yang sehat, efisien, dan berkelanjutan.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="space-y-3 p-6 rounded-xl bg-white border border-gray-100"
            >
              <div className="w-12 h-12 rounded-lg bg-[#F0FDF4] flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="font-semibold text-base">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
