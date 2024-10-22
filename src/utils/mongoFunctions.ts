import { CustomPipelineStage } from '../interface/shared/mongoTypes';

export function mongoLookup(
  lookupTableName: string,
  lookupField: string,
  as: string,
  pipelines: CustomPipelineStage[],
  unwind: boolean = true,
) {
  const details: CustomPipelineStage[] = [
    {
      $lookup: {
        from: lookupTableName,
        localField: lookupField,
        foreignField: '_id',
        as: as,
        pipeline: pipelines,
      },
    },
  ];
  if (unwind) {
    details.push({
      $unwind: {
        path: '$' + as,
        preserveNullAndEmptyArrays: true,
      },
    });
  }

  return details;
}
