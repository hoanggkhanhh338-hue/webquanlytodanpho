import React, { useState, useRef, useEffect } from 'react';
import { OrganizationInfo, ChatMessage } from '../types';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Scale,
  ShieldAlert,
  HelpCircle,
  MessageSquareQuote,
  Flame,
} from 'lucide-react';

interface AiAssistantTabProps {
  orgInfo: OrganizationInfo;
}

export const AiAssistantTab: React.FC<AiAssistantTabProps> = ({ orgInfo }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Xin kính chào Bác Tổ trưởng và Ban Quản lý ${orgInfo.name}!\n\nTôi là **AI Tổ Dân Phố** — trợ lý số chuyên trách hỗ trợ công tác hành chính, truyền thông và giải quyết các vấn đề dân sinh tại cơ sở.\n\nBác có thể yêu cầu tôi:\n- ⚖️ **Tư vấn xử lý tình huống**: Tiếng ồn, rác thải, lấn chiếm ngõ ngách, tranh chấp ranh giới, hòa giải láng giềng.\n- 📋 **Hỏi đáp thủ tục pháp lý**: Đăng ký tạm trú, VNeID, bình xét Gia đình văn hóa, PCCC khu dân cư.\n- ✍️ **Biến đổi văn phong**: Chuyển các ghi chép nháp vắn tắt thành thông báo Zalo thân mật hoặc báo cáo hành chính trang trọng gửi UBND Phường.\n- 🔍 **Rà soát quy định**: Chế độ chính sách cho người cao tuổi, thương bệnh binh, hộ nghèo.`,
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    {
      icon: Scale,
      label: 'Hòa giải tiếng ồn karaoke đêm',
      prompt:
        'Có hộ dân trong ngõ thường xuyên mở loa kéo hát karaoke đến 23h đêm gây bức xúc cho các hộ xung quanh có người già và trẻ nhỏ. Bác Tổ trưởng nên tiếp cận, nhắc nhở và xử lý hòa giải ra sao cho thấu tình đạt lý, đúng pháp luật?',
    },
    {
      icon: Flame,
      label: 'Kiểm tra PCCC nhà trọ trong ngõ',
      prompt:
        'Ban quản lý TDP cần chuẩn bị những nội dung gì để phối hợp cùng Công an Phường kiểm tra an toàn PCCC cho các nhà trọ trong ngõ sâu? Cần tuyên truyền bà con mở lối thoát nạn thứ 2 thế nào?',
    },
    {
      icon: ShieldAlert,
      label: 'Xử lý người thuê trọ chưa đăng ký',
      prompt:
        'Chủ nhà trọ cho người đến ở 2 tuần nay chưa khai báo tạm trú và chưa đăng ký trên VNeID. Tổ trưởng cần xử lý theo trình tự nào theo Luật Cư trú hiện hành?',
    },
    {
      icon: MessageSquareQuote,
      label: 'Chuyển ý thô thành tin nhắn Zalo',
      prompt:
        'Chuyển ý sau thành tin nhắn Zalo ấm áp gửi bà con: "Mai 8h sáng thứ 7 cắt điện từ đầu ngõ đến số nhà 40 để thay đường dây hạ thế đến 14h chiều, bà con sạc pin điện thoại và chuẩn bị nước sinh hoạt trước".',
    },
    {
      icon: HelpCircle,
      label: 'Tiêu chuẩn mừng thọ người cao tuổi',
      prompt:
        'Năm nay tổ dân phố có các cụ 70, 75, 80, 85, 90 tuổi. Quy định hiện hành về độ tuổi chúc thọ, mừng thọ và mức quà tặng của địa phương như thế nào?',
    },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          context: orgInfo,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply || 'Đã ghi nhận yêu cầu của bác. Hệ thống đang đồng bộ dữ liệu.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: 'Có lỗi kết nối tạm thời với máy chủ AI. Bác vui lòng thử bấm gửi lại nhé.',
        timestamp: 'Lỗi',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[550px] bg-stone-50 rounded-xl shadow border border-stone-200 overflow-hidden">
      {/* Header bar of Chat */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-red-800 text-amber-300 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-stone-800 text-sm flex items-center gap-2">
              Trợ Lý AI Tổ Dân Phố
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-xs text-stone-500">
              Cố vấn chính sách, quy chế dân chủ cơ sở & kỹ năng hòa giải
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm('Bác có muốn làm mới cuộc trò chuyện này không?')) {
              setMessages([
                {
                  id: 'welcome-reset',
                  role: 'assistant',
                  text: `Xin kính chào Bác Tổ trưởng! Tôi sẵn sàng lắng nghe và hỗ trợ các công việc tại ${orgInfo.name}.`,
                  timestamp: 'Vừa xong',
                },
              ]);
            }
          }}
          className="text-xs text-stone-500 hover:text-red-700 flex items-center gap-1 px-2.5 py-1 rounded border border-stone-200 hover:bg-stone-50 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Cuộc trò chuyện mới
        </button>
      </div>

      {/* Quick Prompts bar */}
      <div className="bg-stone-100/80 px-4 py-2 border-b border-stone-200 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium text-stone-600 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Gợi ý nhanh:
          </span>
          {quickPrompts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                disabled={isLoading}
                className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white hover:bg-red-50 text-stone-700 hover:text-red-800 border border-stone-300 hover:border-red-300 text-xs transition-colors shadow-sm disabled:opacity-50"
              >
                <Icon className="w-3 h-3 text-red-700" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-amber-600 text-white'
                    : 'bg-red-800 text-amber-300 border border-amber-400/40 shadow-sm'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`relative group max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-red-800 text-white rounded-tr-none shadow-sm'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text.split('\n').map((line, i) => {
                    // Simple markdown bullet / heading styling
                    if (line.startsWith('### ')) {
                      return (
                        <h4 key={i} className="font-bold text-red-900 mt-2 mb-1 text-base">
                          {line.replace('### ', '')}
                        </h4>
                      );
                    }
                    if (line.startsWith('## ')) {
                      return (
                        <h3 key={i} className="font-bold text-red-900 mt-3 mb-1 text-lg">
                          {line.replace('## ', '')}
                        </h3>
                      );
                    }
                    if (line.startsWith('- ') || line.startsWith('* ')) {
                      return (
                        <div key={i} className="flex items-start gap-2 my-1">
                          <span className={isUser ? 'text-amber-200' : 'text-red-700'}>•</span>
                          <span>{line.substring(2)}</span>
                        </div>
                      );
                    }
                    return (
                      <p key={i} className={line.trim() === '' ? 'h-2' : 'my-1'}>
                        {line}
                      </p>
                    );
                  })}
                </div>

                <div
                  className={`flex items-center justify-between mt-2 pt-1 border-t text-[11px] ${
                    isUser ? 'border-red-700/60 text-red-200' : 'border-stone-100 text-stone-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>

                  {!isUser && (
                    <button
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      className="inline-flex items-center gap-1 hover:text-red-700 transition-colors"
                      title="Sao chép câu trả lời"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-medium">Đã sao chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-800 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/40">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none p-4 shadow-sm text-stone-600 text-sm flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-700 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-red-700 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-red-700 animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                AI Tổ dân phố đang tra cứu quy định và soạn câu trả lời...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="bg-white border-t border-stone-200 p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              rows={2}
              placeholder="Nhập câu hỏi, tình huống phát sinh tại khu dân cư hoặc yêu cầu soạn thảo..."
              className="w-full resize-none rounded-xl border border-stone-300 p-3 text-sm focus:border-red-700 focus:ring-1 focus:ring-red-700 focus:outline-none transition-all placeholder:text-stone-400"
              disabled={isLoading}
            />
            <div className="text-[11px] text-stone-400 px-1 mt-0.5 flex justify-between">
              <span>Bấm Enter để gửi, Shift+Enter để xuống dòng</span>
              <span>Bảo mật dữ liệu cá nhân theo NĐ 13/2023/NĐ-CP</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="h-11 px-4 sm:px-5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Gửi câu hỏi</span>
          </button>
        </form>
      </div>
    </div>
  );
};
