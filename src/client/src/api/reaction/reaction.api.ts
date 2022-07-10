import { ReactionData } from 'shared/interface/reaction/reaction.interface';
import { request } from '..';

export function apiReaction(data: ReactionData) {
  return request('post', '/reaction', data);
}
