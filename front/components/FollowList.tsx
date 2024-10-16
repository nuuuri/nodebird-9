import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { StopOutlined } from '@ant-design/icons';
import { Button, Card, List } from 'antd';

import { User } from '@/types/User';

import { unfollowRequestAction } from '@/store/actions/userAction';

interface FollowListProps {
  header: string;
  data: Pick<User, 'email' | 'nickname'>[];
}

export default function FollowList({ header, data }: FollowListProps) {
  const dispatch = useDispatch();

  const onClickUnfollowButton = useCallback(
    (email: string) => {
      dispatch(unfollowRequestAction({ email }));
    },
    [dispatch]
  );

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[
              <StopOutlined
                key="stop"
                onClick={() => onClickUnfollowButton(item.email)}
              />,
            ]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}
