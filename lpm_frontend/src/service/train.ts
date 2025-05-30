import { Request } from '../utils/request';
import type { CommonResponse, EmptyResponse } from '../types/responseModal';

interface ProcessInfo {
  cmdline: string[];
  cpu_percent: string;
  create_time: string;
  memory_percent: string;
  pid: string;
}

interface ServiceStatusRes {
  process_info?: ProcessInfo;
  is_running?: boolean;
}

interface StartTrainResponse {
  progress_id: string;
}

export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'suspended';
export type StageStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'suspended';

interface TrainStep {
  completed: boolean;
  name: string;
  status: StepStatus;
}

interface TrainStage {
  name: string;
  progress: number;
  status: StageStatus;
  steps: TrainStep[];
  current_step: string | null;
}

export type StageName =
  | 'downloading_the_base_model'
  | 'activating_the_memory_matrix'
  | 'synthesize_your_life_narrative'
  | 'prepare_training_data_for_deep_comprehension'
  | 'training_to_create_second_me';

export type StageDisplayName =
  | 'Downloading the Base Model'
  | 'Activating the Memory Matrix'
  | 'Synthesize Your Life Narrative'
  | 'Prepare Training Data for Deep Comprehension'
  | 'Training to create Second Me';

export interface TrainProgress {
  stages: TrainStage[];
  overall_progress: number;
  current_stage: StageName;
  status: StageStatus;
}

export interface TrainingConfig extends TrainingParams {
  model_name: string;
}

export const startTrain = (config: TrainingConfig) => {
  return Request<CommonResponse<StartTrainResponse>>({
    method: 'post',
    url: '/api/trainprocess/start',
    data: config
  });
};

export const getTrainProgress = (config: TrainingConfig) => {
  return Request<CommonResponse<TrainProgress>>({
    method: 'get',
    url: `/api/trainprocess/progress/${config.model_name}`
  });
};

export const stopTrain = () => {
  return Request<CommonResponse<EmptyResponse>>({
    method: 'post',
    url: `/api/trainprocess/stop`
  });
};

export const retrain = (config: TrainingConfig) => {
  return Request<CommonResponse<EmptyResponse>>({
    method: 'post',
    url: `/api/trainprocess/retrain`,
    data: config
  });
};

export const startService = (config: TrainingConfig) => {
  return Request<CommonResponse<EmptyResponse>>({
    method: 'post',
    url: `/api/kernel2/llama/start`,
    data: config
  });
};

export const getServiceStatus = () => {
  return Request<CommonResponse<ServiceStatusRes>>({
    method: 'get',
    url: `/api/kernel2/llama/status`
  });
};

export const stopService = () => {
  return Request<CommonResponse<EmptyResponse>>({
    method: 'post',
    url: `/api/kernel2/llama/stop`
  });
};

export const getModelName = () => {
  return Request<CommonResponse<TrainingConfig>>({
    method: 'get',
    url: `/api/trainprocess/model_name`
  });
};

export const getTrainingParams = () => {
  return Request<CommonResponse<TrainingParams>>({
    method: 'get',
    url: `/api/trainprocess/training_params`
  });
};
