import { setCurrency } from "../reducers/currency";
import { AppDispatch } from "../store/store";

const setCurrencyAction = async (dispatch: AppDispatch, currency: string) => {
    dispatch(
        setCurrency({
            currency,
        })
    );
};

export { setCurrencyAction };
