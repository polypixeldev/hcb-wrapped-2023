import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";
import title from "title";

const additionalData: {
  [key: string]: {
    image: string;
    color: string;
  };
} = {
  PAYPAL: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_Logo_Icon_2014.svg/1664px-PayPal_Logo_Icon_2014.svg.png",
    color: $.blue
  },
  AMAZON: {
    image: "https://wisdom-stone.com/wp-content/uploads/amazon-logo.png",
    color: $.orange
  },
  "STICKER MULE": {
    image:
      "https://cdn.icon-icons.com/icons2/2699/PNG/512/stickermule_logo_icon_169715.png",
    color: $.red
  },
  "KIT LENDER": {
    image:
      "https://cloud-4jlvg7r0t-hack-club-bot.vercel.app/0screenshot_2023-12-15_at_12.40.20___am.png",
    color: $.green
  },
  "PREMIER COACH COMPANY INC": {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bus-logo.svg/2048px-Bus-logo.svg.png",
    color: $.muted
  }
};

export function prettifyCategory(c: string) {
  c = c.toLowerCase();
  c = c.replaceAll("_", " ");
  switch (c) {
    case "travel agencies tour operators":
      return "airlines";
    case "eating places restaurants":
      return "restaurants";
    case "hotels motels and resorts":
      return "hotels";
    default:
      return c;
  }
}

export default function HCBTopMerchants({ data }: SlideProps) {
  let categories = Object.entries(data.hcb.spendingByCategory)
    .sort((a, b) => b[1] - a[1])
    .filter((x) => x[0] != "WIRES_MONEY_ORDERS")
    .map((category) => prettifyCategory(category[0]))
    .slice(0, 5);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100%",
          paddingBottom: "30px"
        }}
      >
        <div
          {...$({
            animate$fadeIn: {
              args: ["fromTop"]
            }
          })}
        >
          <h1
            {...$.headline({ fontSize: "2em", margin: "0px", color: "white" })}
          >
            Oh the places we spent at!
          </h1>
          <p {...$.lead({ color: "white", marginTop: $.s1 })}>
            HCB cards were used at{" "}
            {Object.keys(data.hcb.spendingByMerchant).length.toLocaleString()}{" "}
            different merchants over the past year.
          </p>
        </div>
        <div
          {...$({
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
            width: "100%"
          })}
        >
          {Object.entries({
            ...data.hcb.spendingByMerchant,
            AMAZON:
              data.hcb.spendingByMerchant["AMZN MKTP US"] +
              data.hcb.spendingByMerchant["AMAZON.COM"],
            "AMZN MKTP US": 0,
            "AMAZON.COM": 0
          })
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map((merchant) => (
              <div
                {...$({
                  display: "flex",
                  borderRadius: "8px",
                  background: additionalData[merchant[0]]?.color || $.blue,
                  animate$fadeIn: {
                    args: ["fromLeft"]
                  }
                })}
              >
                <img
                  src={
                    additionalData[merchant[0]]?.image ||
                    "https://cdn-icons-png.flaticon.com/512/2697/2697432.png"
                  }
                  style={{
                    background: "white",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    height: "72px",
                    width: "72px",
                    objectFit: "contain",
                    padding: "12px"
                  }}
                />
                <div style={{ padding: "12px", color: $.white }}>
                  <b>{title(merchant[0])}</b>
                  <br /> {USDollarNoCents.format(merchant[1] / 100)}
                </div>
              </div>
            ))}
        </div>
        <div
          {...$({
            margin: `${$.s3} auto`,
            fontSize: "1.2em",
            color: "white",
            textAlign: "left",
            animate$fadeIn: {
              args: ["fromBottom"]
            }
          })}
        >
          Most money was spent at {categories[0]}, {categories[1]},{" "}
          {categories[2]}, {categories[3]}, and {categories[4]}.
        </div>
        <Background />
      </div>
    </>
  );
}

HCBTopMerchants.config = {
  bg: $.purple
} satisfies SlideOptions;
