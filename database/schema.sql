-- SpineX MySQL database placeholder
-- MVP does not connect to a live database.
-- This schema shows how the production version could store structured posture data.

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  display_name VARCHAR(100),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE devices (
  device_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  device_name VARCHAR(100),
  device_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE posture_sessions (
  session_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  device_id INT,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  total_minutes INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (device_id) REFERENCES devices(device_id)
);

CREATE TABLE posture_observations (
  observation_id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT,
  recorded_at TIMESTAMP,
  upper_pitch DECIMAL(6,2),
  upper_roll DECIMAL(6,2),
  lower_pitch DECIMAL(6,2),
  lower_roll DECIMAL(6,2),
  posture_state VARCHAR(100),
  FOREIGN KEY (session_id) REFERENCES posture_sessions(session_id)
);

CREATE TABLE pain_checkins (
  checkin_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  pain_level INT,
  pain_points_json JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE reports (
  report_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  report_type VARCHAR(50),
  spine_habit_score INT,
  summary_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);