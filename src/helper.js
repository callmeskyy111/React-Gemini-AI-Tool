export function checkHeading(str) {
  return /^(\*)(\*)(.*)\*$/.test(str);
}

export function replaceHeadingStars(str) {
  return str.replace(/^(\*)(\*)|(\*)$/g, "");
}

export function formatDateTime(date) {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Determine AM/PM and convert to 12-hour format
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;

  // Add suffix to day (st, nd, rd, th)
  const daySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${day}${daySuffix(day)} ${month}, ${formattedHours}:${minutes.toString().padStart(2, '0')}${ampm}`;
}

