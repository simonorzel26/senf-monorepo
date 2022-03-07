/* helper functions for the application */

import moment from "moment";
import _ from "lodash";

/**
 * Function returning the build date(as per provided epoch)
 * @param epoch Time in milliseconds
 */
export const getBuildDate = (epoch) => {
  const buildDate = moment(epoch).format("DD-MM-YYY HH:MM");
  return buildDate;
};

/*
https://arizonatribe.github.io/vanillas/global.html#pick

Removes everything except the specified keys from an object (after cloning the Object).

@param keys 	Array.<String> 	 An array of keys to search for in the Object and include from the output
@param obj 	  Object 	         An Object from which to copy and remove keys

@returns A copy of the original Object, but with only the specified keys
*/
export function pick(keys, obj) {
  const newObj = {};
  const numOfKeys = keys.length;
  for (let i = 0; i < numOfKeys; i++) {
    if (keys[i] in obj) {
      newObj[keys[i]] = obj[keys[i]];
    }
  }
  return newObj;
}
/*
Removes characters from a string without modifying the original string.


@param str 	  String 	         A string which will be truncated
@param num 	  Number 	         A number of characters to remove from a string

@returns A copy of reduced string with ... at the end.
*/
export function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function search(dbData, userInput, dbDataKeys) {
  const sanitizedUserInput = userInput.toString().toLowerCase();

  if (userInput === "") {
    return dbData;
  }
  return dbData.filter((object) => {
    return dbDataKeys.some((dbDataKey) => {
      return object[dbDataKey]
        ?.toString()
        .toLowerCase()
        .includes(sanitizedUserInput);
    });
  });
}

export function sort(items, dropdown) {
  return dropdown === "newest"
    ? _.orderBy(items, "createdAt", "desc")
    : dropdown === "hottest"
    ? _.orderBy(items, "likeCount", "desc")
    : dropdown === "aToZ"
    ? _.orderBy(items, [(pr) => pr.title.toLowerCase()], ["asc"])
    : _.orderBy(items, [(pr) => pr.title.toLowerCase()], ["desc"]);
}

export function filterByTagFilter(items, selectedTags, tagsType) {
  if (tagsType === "Thema") {
    return items.filter(({ Thema }) => selectedTags.includes(Thema));
  } else {
    return items.filter(({ organizationType }) =>
      selectedTags.includes(organizationType)
    );
  }
}

export function filterByStatus(items) {
  return items.filter(({ status }) => status === "None");
}

export function filterByGeodata(items, mapBounds) {
  return items.filter(
    ({ lat, long }) =>
      lat <= mapBounds?.latitude1 &&
      lat >= mapBounds?.latitude2 &&
      long >= mapBounds?.longitude2 &&
      long <= mapBounds?.longitude3
  );
}
