export interface FilterState {
    minMarketCap: number;
    sortOrder: "asc" | "desc";
}

export type Action =
    | { type: "SET_MIN_MARKET_CAP"; payload: number }
    | { type: "SET_SORT_ORDER"; payload: "asc" | "desc" };

export const filterReducer = (state: FilterState, action: Action): FilterState => {
    switch (action.type) {
        case "SET_MIN_MARKET_CAP":
            return { ...state, minMarketCap: action.payload };
        case "SET_SORT_ORDER":
            return { ...state, sortOrder: action.payload };
        default:
            return state;
    }
};
