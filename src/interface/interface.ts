export interface DataItem {
  commonName: string;
  botanicName: string;
  room: string;
  plantID: number;
  plantImgUrl: string;
}

export interface PlantsListType {
  data: DataItem[];
  addPlant: (newData: DataItem[]) => void;
  removePlant: (plantIndex: number) => void;
}

export interface PlantIdData {
  confirmed: boolean;
  id: number;
  plant_details: {
    language: string;
    scientific_name: string;
    structured_name: {
      genus: string;
      species: string;
    };
  };
  plant_name: string;
  probability: number;
}

export interface ImageData {
  filename: string;
  url: string;
}

export interface MetaData {
  date: string;
  datetime: string;
  latitude: number | null;
  longitude: number | null;
}

export interface PlantFullData {
  countable: boolean;
  custom_id: string | null;
  fail_cause: number | null;
  feedback: string | null;
  finished_datetime: number;
  id: number;
  images: ImageData[];
  is_plant: boolean;
  is_plant_probability: number;
  meta_data: MetaData;
  modifiers: string[];
  secret: string;
  suggestions: PlantIdData[];
  uploaded_datetime: number;
}
