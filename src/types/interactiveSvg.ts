export type CommonBodyPart = 'head'
| 'ears'
| 'hand'
| 'foot';

export type CommonFrontBodyPart = 'eyes'
| 'nose'
| 'oral_cavity'
| 'whole_head';

export type CommonBackPart = 'back'
| 'buttocks'
| 'anus';

export type InfantBodyPart = 'upper_limb'
| 'lower_limb'
| CommonBodyPart;

export type InfantFrontPart = 'chest_and_abdomen'
| 'diaper_area'
| InfantBodyPart
| CommonFrontBodyPart;

export type InfantBackPart = 'neck'
| InfantBodyPart
| CommonBackPart;

export type BaseBodyPart = 'upper_arm'
| 'upper_abdomen'
| 'forearm'
| 'mid_abdomen'
| 'lower_abdomen'
| 'thigh'
| 'knee'
| 'lower_leg'
| CommonBodyPart;

export type BaseFrontPart =
| 'neck_or_throat'
| 'chest'
| 'upper_abdomen'
| 'mid_abdomen'
| 'lower_abdomen'
| 'sexual_organs'
| BaseBodyPart
| CommonFrontBodyPart;

export type BaseBackPart = 'nape_of_neck'
| 'elbow'
| 'lower_back'
| BaseBodyPart
| CommonBackPart;

export type AbdominalPart = 'upper-right'
| 'upper-middle'
| 'upper-left'
| 'center'
| 'lower-right'
| 'lower-middle'
| 'lower-left';

export type InteractiveSvgBodyPart = InfantBackPart
| InfantFrontPart
| BaseFrontPart
| BaseBackPart
| AbdominalPart;

export type InteractiveSvgRegion = 'united-states-canada'
| 'latin-south-america'
| 'europe'
| 'northern-africa'
| 'central-africa'
| 'southern-africa'
| 'middle-east'
| 'asia-excluding-middle-east-russia-mongolia-kazakhstan'
| 'australia-oceania'
| 'russia-kazakhstan-mongolia';

