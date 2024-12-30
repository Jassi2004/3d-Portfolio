import React, { useState } from 'react';
import {
    Mail,
    Phone,
    Linkedin,
    Github,
    Code,
    Copy,
    Check,
    MessageSquare,
    ExternalLink
} from 'lucide-react';
import { resumeData } from '../../resumeInfo';

const ContactCard = ({ icon: Icon, label, value, link, onClick }) => {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        if (onClick) {
            onClick();
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const content = (
        <div className="group flex items-center justify-between p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                    <Icon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                    <p className="text-sm text-gray-400">{label}</p>
                    <p className="text-gray-200">{value}</p>
                </div>
            </div>
            {onClick ? (
                <button
                    onClick={handleClick}
                    className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
                >
                    {copied ? (
                        <Check className="h-5 w-5 text-green-400" />
                    ) : (
                        <Copy className="h-5 w-5 text-purple-400" />
                    )}
                </button>
            ) : link ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
                >
                    <ExternalLink className="h-5 w-5 text-purple-400" />
                </a>
            ) : null}
        </div>
    );

    if (link && !onClick) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-300"
            >
                {content}
            </a>
        );
    }

    return content;
};

export const ContactPage = () => {
    const { personalInfo } = resumeData;

    const copyToClipboard = (text) => {
        navigator.clipboard.write([
            new ClipboardItem({
                'text/plain': new Blob([text], { type: 'text/plain' })
            })
        ]);
    };

    return (
        <div className="min-h-screen w-full bg-[#CFFFFF] p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <MessageSquare className="h-8 w-8 text-purple-500" />
                            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                                Contact Me
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <ContactCard
                                icon={Mail}
                                label="Email"
                                value={personalInfo.email}
                                onClick={() => copyToClipboard(personalInfo.email)}
                            />

                            <ContactCard
                                icon={Phone}
                                label="Phone"
                                value={personalInfo.phone}
                                onClick={() => copyToClipboard(personalInfo.phone)}
                            />

                            <ContactCard
                                icon={Linkedin}
                                label="LinkedIn"
                                value="Connect on LinkedIn"
                                link={personalInfo.linkedin}
                            />

                            <ContactCard
                                icon={Github}
                                label="GitHub"
                                value="Follow on GitHub"
                                link={personalInfo.github}
                            />

                            <ContactCard
                                icon={Code}
                                label="LeetCode"
                                value="View LeetCode Profile"
                                link={personalInfo.leetcode}
                            />
                        </div>

                        <div className="mt-8 p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
                            <p className="text-gray-300 text-center">
                                Feel free to reach out! I'm always open to discussing new opportunities, tech, or just having a friendly chat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;