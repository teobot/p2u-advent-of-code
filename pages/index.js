import { useContext, useEffect } from "react";

import Link from "next/link";

import { AdventOfCodeDataContext } from "../pages/_app";

export default function Home() {
  const { years, fetchYears } = useContext(AdventOfCodeDataContext);

  useEffect(() => {
    fetchYears();
  }, []);
  return (
    <>
      {JSON.stringify()}{" "}
      {years.map((year) => (
        <Link key={year} href={`/${year}`}>
          <div className="p-2 bg-dark m-2 text-white">{year}</div>
        </Link>
      ))}
    </>
  );
}
