import React from 'react';

import _ from 'lodash';
import { useInView } from 'react-intersection-observer';

import TimeShowConversation from './timeShow';
import TicketUserMessage from './userMessage';
import OtherMessagePreview from './otherMessage';

import { useSocket } from '@particles/context/SocketContext';
import { getUserFromJwt } from '@particles/helper/tokenService';
import { ChatConversation } from '@particles/const/Dashboard/Employer/chat';
import { strIntoDateLiteral } from '@particles/helper/DateIntoStringLiterals';
import useFetchConversation from '@particles/hooks/dashboard/ticket/useFetchConversation';

interface IMessage {
  _id: string;
  message: string;
  date: string;
  user: string;
  isCurrentUser: boolean;
  image: string;
  messageImage: string;
}
[];

const TicketConversationView: React.FC<{ id: string }> = ({ id }) => {
  const [conversation, setConversation] = React.useState<IMessage[]>([]);
  const [arrivalMessages, setArrivalMessages] = React.useState<IMessage[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [pos, setPos] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [typing, setTyping] = React.useState<{ fullName: string } | null>(null);

  const socket = useSocket();
  const { ref, inView } = useInView();
  const lastMessageRef = React.useRef<HTMLDivElement>(null);

  const { data: messageList, isLoading } = useFetchConversation({ ticket: id, page });

  React.useEffect(() => {
    if (messageList && messageList?.totalPage < page) return;
  }, [page, id]);

  React.useEffect(() => {
    setConversation((prev) => {
      const data = [
        ...(messageList?.data
          .map((row) => ({
            _id: row._id,
            message: row.message,
            date: row.createdAt,
            user: row.sendBy.fullName,
            isCurrentUser: row.isCurrentUser,
            messageImage: row?.file?.completedUrl || '',
            image: row?.sendBy?.photo?.completedUrl || '',
          }))
          .reverse() || []),
        ...prev,
        ...arrivalMessages,
      ];

      return _.uniqBy(data, '_id');
    });
  }, [messageList, arrivalMessages, page]);

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  const scrollToBottom = () => {
    const container = containerRef.current;

    container?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    scrollToBottom();

    const handleScroll = () => {
      const observer = new IntersectionObserver((e) => {
        e.forEach((entry) => {
          setPos(!entry.isIntersecting);
        });
      });

      const sectionToObserve = document.querySelector('#messageEnd');
      if (sectionToObserve) {
        observer.observe(sectionToObserve);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, isLoading]);

  React.useEffect(() => {
    socket.on(`message_${id}`, (row) => {
      const user = getUserFromJwt();
      const message = {
        _id: row._id,
        message: row.message,
        date: row.createdAt,
        user: row.sendBy?.fullName,
        isCurrentUser: user?._id === row?.sendBy?._id,
        messageImage: row?.file?.completedUrl || '',
        image: row?.sendBy?.photo?.completedUrl || '',
      };

      // Here add how to handle message
      setArrivalMessages((prev) => [...prev, message]);
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [id]);

  React.useEffect(() => {
    socket.on(`typing_${id}`, (row) => {
      setTyping(row);
      setTimeout(() => {
        setTyping(null);
      }, 2000);
    });
  }, [id]);

  return (
    <section className="w-full flex flex-col gap-10">
      <div ref={ref} />
      {isLoading && 'loading...'}
      {conversation.map((value, index) => {
        if (index === 0) {
          return (
            <React.Fragment key={`message-${index}`}>
              <TimeShowConversation time={strIntoDateLiteral(new Date(value.date))} />
              {value.isCurrentUser ? (
                <TicketUserMessage message={value.message} messageImage={value.messageImage} />
              ) : (
                <OtherMessagePreview
                  name={value.user}
                  message={value.message}
                  image={value.image}
                  messageImage={value.messageImage}
                />
              )}
              {!(index + 1 > conversation.length - 1) &&
                new Date(value.date).getDay() !== new Date(conversation[index + 1].date).getDay() && (
                  <TimeShowConversation time={strIntoDateLiteral(new Date(conversation[index + 1].date))} />
                )}
            </React.Fragment>
          );
        }
        if (
          !(index + 1 > conversation.length - 1) &&
          new Date(value.date).getDay() !== new Date(conversation[index + 1].date).getDay()
        ) {
          return (
            <React.Fragment key={`message-${index}`}>
              {value.isCurrentUser ? (
                <TicketUserMessage message={value.message} messageImage={value.messageImage} />
              ) : (
                <OtherMessagePreview
                  name={value.user}
                  message={value.message}
                  image={value.image}
                  messageImage={value.messageImage}
                />
              )}
              <TimeShowConversation time={strIntoDateLiteral(new Date(conversation[index + 1].date))} />
              {index === conversation.length - 1 && <div ref={containerRef} id="messageEnd"></div>}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={`message-${index}`}>
              {value.isCurrentUser ? (
                <TicketUserMessage message={value.message} messageImage={value.messageImage} />
              ) : (
                <OtherMessagePreview
                  name={value.user}
                  message={value.message}
                  image={value.image}
                  messageImage={value.messageImage}
                />
              )}
              {index === conversation.length - 1 && <div ref={containerRef} id="messageEnd"></div>}
            </React.Fragment>
          );
        }
      })}

      {pos && (
        <div
          className="px-4 py-2 rounded-full shadow-card absolute bottom-24 left-1/2 -translate-x-1/2 cursor-pointer border border-neutral-300"
          onClick={() => scrollToBottom()}
        >
          Latest Message
        </div>
      )}

      <div ref={lastMessageRef} />
      {typing && <>{typing?.fullName} is typing</>}
    </section>
  );
};

export default TicketConversationView;
