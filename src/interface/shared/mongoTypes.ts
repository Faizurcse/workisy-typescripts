export interface ProjectStage {
  $project: {
    [key: string]: any; // We use `any` here for simplicity but you can further detail the expected fields.
  };
}

export interface LookupStage {
  $lookup: {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
    pipeline?: CustomPipelineStage[];
  };
}

export interface UnwindStage {
  $unwind:
    | {
        path: string;
        preserveNullAndEmptyArrays: boolean;
      }
    | any;
}

// Add other stages as needed
export interface SortStage {
  $sort: {
    [key: string]: number;
  };
}

export interface MatchStage {
  $match: {
    [key: string]: any; // Use appropriate type based on your match criteria
  };
}

export interface LimitStage {
  $limit: number;
}
export interface GreaterEqualStage {
  $gte: Date;
}
export interface LowerEqualStage {
  $lte: Date;
}
export interface SetStage {
  $set: {
    [key: string]: any;
  };
}

export interface CountStage {
  $count: string;
}

export interface AddFields {
  $addFields: {
    [key: string]: any;
  };
}

export interface Group {
  $group: {
    [key: string]: any;
  };
}

export interface Facet {
  $facet: {
    [key: string]: any;
  };
}

export interface ReplaceRoot {
  $replaceRoot: {
    [key: string]: any;
  };
}

export type CustomPipelineStage =
  | ProjectStage
  | LookupStage
  | UnwindStage
  | SortStage
  | LimitStage
  | MatchStage
  | AddFields
  | Group
  | Facet
  | ReplaceRoot
  | CountStage
  | GreaterEqualStage
  | LowerEqualStage
  | SetStage;

// Define the array type for the pipeline
export type CustomPipeline = CustomPipelineStage[];
