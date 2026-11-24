CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  data jsonb NOT NULL,
  status text NOT NULL DEFAULT 'new'
);
