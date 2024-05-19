export const setQueryParams = (newParams) => {
  const filteredParams = Object.fromEntries(
    Object.entries(newParams).filter(
      ([key, value]) =>
        value !== "" &&
        value !== "Select Qualification" &&
        value !== "Select Sect" &&
        value !== "Select City" &&
        value !== "Select Nationality" &&
        value !== "Select Martial Status" &&
        value !== "Select Cast"
    )
  );
  const searchParams = new URLSearchParams(filteredParams).toString();
  window.history.replaceState(null, "", `?${searchParams}`);
};

export const getURLParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
};

