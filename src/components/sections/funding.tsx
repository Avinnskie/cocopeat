import Image from "next/image";

/**
 * Funding attribution required by the DPPM grant contract:
 *   B — names the funding bodies (DPPM, Ditjen Risbang, Kemdiktisaintek)
 *   C — states the program type
 *   E — displays the Kemdiktisaintek logo as funder
 *
 * Wording and hierarchy follow the grant document, so treat the copy below as
 * contractual text rather than marketing copy — do not paraphrase it.
 */

const PROGRAM_DETAILS = [
    { term: "Skema", value: "Pemberdayaan Berbasis Masyarakat" },
    { term: "Bidang Fokus", value: "Produk rekayasa keteknikan" },
    { term: "Durasi", value: "1 Tahun" },
    { term: "Tahun Pelaksanaan", value: "2026" },
] as const;

const INSTITUTIONS = [
    {
        name: "Kementerian Pendidikan Tinggi, Sains, dan Teknologi",
        abbr: "Kemdiktisaintek",
    },
    {
        name: "Direktorat Jenderal Riset dan Pengembangan",
        abbr: "Ditjen Risbang",
    },
    {
        name: "Direktorat Penelitian dan Pengabdian kepada Masyarakat",
        abbr: "DPPM",
    },
] as const;

export default function FundingSection() {
    return (
        <section
            aria-labelledby="funding-heading"
            className="px-5 sm:px-8 md:px-12 lg:px-20 pb-16 sm:pb-20"
        >
            <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
                    <div className="p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#16A34A]">
                            Didanai oleh
                        </p>

                        <figure className="mt-6">
                            <Image
                                src="/images/logo-kemdiktisaintek1.png"
                                alt="Logo Kementerian Pendidikan Tinggi, Sains, dan Teknologi bersama Ditjen Risbang"
                                width={752}
                                height={166}
                                className="h-auto w-full max-w-[19rem]"
                            />
                        </figure>

                        <ul className="mt-8 space-y-4 flex justify-between">
                            {INSTITUTIONS.map((institution) => (
                                <li
                                    key={institution.abbr}
                                    className="leading-snug"
                                >
                                    <span className="block text-lg font-semibold text-foreground">
                                        {institution.abbr}
                                    </span>
                                    <span className="block text-sm text-muted-foreground">
                                        {institution.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-6 sm:p-10">
                        <h2
                            id="funding-heading"
                            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                        >
                            Program
                        </h2>
                        <p className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-balance">
                            Pemberdayaan Kemitraan Masyarakat
                        </p>
                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-foreground/80 text-pretty">
                            Hilirisasi Produk Media Tanam Cocopeat Plus melalui
                            Integrasi Mesin Pengolah Otomatis dan Landing Page
                            Pemasaran Digital bagi Kelompok Petani Muda Jaya
                            Desa Punggur Besar
                        </p>

                        <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden">
                            {PROGRAM_DETAILS.map((detail) => (
                                <div
                                    key={detail.term}
                                    className="bg-white py-3.5"
                                >
                                    <dt className="text-[11px] font-medium tracking-wider text-muted-foreground">
                                        {detail.term}
                                    </dt>
                                    <dd className="mt-1 text-sm font-semibold text-foreground">
                                        {detail.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
