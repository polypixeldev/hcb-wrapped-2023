import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";

export default function HCB({ data }: SlideProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingBottom: "30px"
        }}
      >
        <h1
          {...$.headline({ fontSize: "2em", marginTop: "0px", color: "white" })}
        >
          It was a BIG year.
        </h1>
        <div
          {...$({
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
            width: "100%"
          })}
        >
          <HCBStat
            data={data.hcb.organizations.new}
            label="new organizations"
            background={$.yellow}
            isNumber
          />
          <HCBStat
            data={data.hcb.users.new}
            label="new users"
            background={$.cyan}
            isNumber
          />
          <HCBStat
            data={Math.abs(data.hcb.spent / 100)}
            label="spent by organizations"
            background={$.green}
            isNumber
            prefix="$"
          />
          <HCBStat
            data={data.hcb.raised / 100}
            label="raised on HCB"
            background={$.orange}
            isNumber
            prefix="$"
          />
        </div>
        <div
          {...$({
            margin: `${$.s3} auto`,
            fontSize: "0.9em",
            width: "80%",
            color: "white",
            textAlign: "center"
          })}
        >
          All this... plus surviving two bank collapses and rebranding (
          <i>what's Bank?</i>).
        </div>
        <Background />
      </div>
    </>
  );
}

HCB.config = {
  bgImage: `linear-gradient(rgba(37,36,41,0.5) 0%, rgba(37,36,41,0.85) 75%), url(https://cloud-e4hjosvw9-hack-club-bot.vercel.app/2outernet-110.jpeg)`
} satisfies SlideOptions;
