import { WrappedData } from "../utils/data";
import $ from "@/utils/theme";
import React, { useCallback, useState } from "react";
import { generateSlidesOrder } from "../slides";
import Stories from "react-insta-stories";
import { Action, Story } from "react-insta-stories/dist/interfaces";
import useViewport from "../hooks/useViewport";
import { ErrorBoundary } from "react-error-boundary";

export interface SlideProps {
  data: WrappedData;
  action?: Action;
  isPaused?: boolean;
  config?: Story;
}

export interface SlideOptions {
  bg?: string;
  bgImage?: string;
  duration?: number;
  skipSlide?: (data: WrappedData) => boolean;
}

type WrappedSlideComponent = (props: SlideProps) => JSX.Element;

export type WrappedSlide = WrappedSlideComponent & { config?: SlideOptions };

export default function Slides({ data }: { data: WrappedData }) {
  let { width, height } = useViewport(true);

  const padding = width * 3 > height ? 120 : 0;
  width -= padding;
  height -= padding;
  const ratio = width / height;
  const scale = ratio > 9 / 16 ? height / 768 : width / 432;

  const [index, setIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setIndex((i) => i - 1);
  }, [setIndex]);

  const handleNext = useCallback(() => {
    setIndex((i) => i + 1);
  }, [setIndex]);

  return (
    <>
      <button style={{ marginRight: 10 }} onClick={handlePrev}>
        &#x25C0;
      </button>
      <div
        className="main"
        style={{
          transform: `scale(${scale})`,
          overflow: "hidden"
        }}
      >
        <div className="content"></div>
        <Stories
          currentIndex={index}
          stories={generateSlidesOrder(data)
            .filter(({ config }: WrappedSlide) => !config?.skipSlide?.(data))
            .map((Slide: WrappedSlide) => {
              const { config } = Slide;
              return {
                content: ({ action, isPaused, config: storyConfig }) => (
                  <div
                    style={{
                      ...(Slide.config?.bg
                        ? { background: Slide.config?.bg }
                        : Slide.config?.bgImage
                          ? {
                              backgroundImage: Slide.config?.bgImage,
                              backgroundSize: "cover",
                              backgroundPosition: "center bottom"
                            }
                          : { background: "white" }),
                      width: "100%",
                      height: "100%",
                      paddingTop: $.s5,
                      paddingBottom: $.s4,
                      paddingLeft: $.s3,
                      paddingRight: $.s3
                    }}
                  >
                    <ErrorBoundary
                      fallbackRender={({ error }) => <p>{error.message}</p>}
                    >
                      <Slide
                        data={data}
                        action={action}
                        isPaused={isPaused}
                        config={storyConfig as any}
                      />
                    </ErrorBoundary>
                  </div>
                ),
                duration: config?.duration
              };
            })}
          defaultInterval={8_000}
          width={432}
          height={768}
          keyboardNavigation
        />
      </div>
      <button style={{ marginLeft: 10 }} onClick={handleNext}>
        &#x25B6;
      </button>
    </>
  );
}
