export type User = {
  id: string;
  email: string;
  name: string;
  role: boolean;
  specialty: string;
};

export type CardItemProps = {
  imageSrc?: string;
  name?: string;
  role?: string;
  cardImageSrc?: string;
  cardTitle?: string;
  cardContent?: string;
};

export type Lead = {
  avatar: string;
  name: string;
  email: string;
  project: string;
  duration: number;
  status: string;
};
