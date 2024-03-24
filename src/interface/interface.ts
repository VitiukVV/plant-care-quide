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