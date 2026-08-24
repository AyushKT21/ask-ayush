import type { PortfolioContext } from "@/types/context";

export type ChatStreamEvent =
  | {
      type: "delta";
      message: string;
      context?: PortfolioContext;
    }
  | {
      type: "finish";
      message: string;
      context: PortfolioContext;
      sources: string[];
    }
  | {
      type: "error";
      error: string;
    };
