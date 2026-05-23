export function generateDailyInsight(summary) {
  const parts = [];

  if (summary.forwardFlexionMinutes >= 15) {
    parts.push("moderate forward leaning was detected during today’s monitoring session");
  } else {
    parts.push("forward leaning time remained relatively low today");
  }

  if (summary.prolongedStaticEpisodes >= 3) {
    parts.push(`${summary.prolongedStaticEpisodes} prolonged static posture episodes were recorded, so more frequent movement breaks may be helpful`);
  }

  if (summary.stretchCompleted >= 2) {
    parts.push(`stretch completion was ${summary.stretchCompleted}/${summary.stretchTarget}, showing positive self-management engagement`);
  } else {
    parts.push("stretch completion was below the daily target");
  }

  if (summary.painLevel >= 5) {
    parts.push("reported pain was elevated, so the user may consider discussing the report with a physiotherapist or GP");
  }

  return `${parts.join(". ")}. This summary supports posture awareness and rehabilitation follow-up, not diagnosis.`;
}

export function generateWeeklyInsight(summary) {
  const parts = [];

  parts.push(`this week’s average spine habit score was ${summary.averageScore}/100`);

  if (summary.forwardTrend.toLowerCase().includes("decreased")) {
    parts.push("forward leaning time slightly decreased, suggesting some improvement in posture behaviour");
  } else {
    parts.push("forward leaning remained an area to monitor");
  }

  if (summary.staticEpisodes >= 15) {
    parts.push("prolonged static posture episodes remained frequent, so movement breaks should still be prioritised");
  }

  if (summary.stretchAdherence < 70) {
    parts.push(`stretching adherence was moderate at ${summary.stretchAdherence}%`);
  } else {
    parts.push("stretching adherence was strong");
  }

  return `${parts.join(". ")}. The report can support follow-up discussion with a physiotherapist if discomfort persists.`;
}